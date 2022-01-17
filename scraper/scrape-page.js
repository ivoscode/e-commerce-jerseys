const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
axios.defaults.headers.common[
  `Accept-Language`
] = `en-US,en;q=0.9,lv;q=0.8,ru;q=0.7,la;q=0.6`;
const url = `http://x.yupoo.com`;

let products = [];

///////////
const getAlbums = (html) => {
  const $ = cheerio.load(html);
  let links = $(`a`);

  let urls = links
    .map((i, e) => {
      return url + $(e).attr(`href`);
    })
    .toArray()
    .filter((x) => x.includes(`albums/`))
    .splice(0, 10);
  console.log("urls array", urls);

  urls.forEach((x) => {
    axios
      .get(x)
      .then((response) => {
        getProduct(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  });
};

const getProduct = async (html) => {
  const $ = cheerio.load(html);
  //const id = $(`.image__imagewrap img`).attr("data-album-id");
  //const title = $(`.showalbumheader__gallerytitle`).text();
  const photoId = $(`.showalbum__parent .showalbum__children`).attr("data-id");
  let image = [];
  $(`.showalbum__parent .showalbum__children img`).each((i, element) => {
    res = $(element).attr("data-origin-src");
    image.push({ src: `http:${res}` });
  });
  const { yuId, name, category, updatedAt } = await getProductInfo(photoId);

  /////////////////
  products.push({
    yuId,
    name,
    category,
    image,
    updatedAt,
  });
  console.log(products.length);
  //////////////////
  fs.writeFile("products-page.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Successfully written data to file");
  });
};

///////////
const getProductInfo = async (photoId) => {
  let yuId = null;
  let name = null;
  let category = null;
  let updatedAt = null;
  await axios
    .get(
      `http://x.yupoo.com/api/web/photos/${photoId}/album?uid=1&userId=151564`
    )
    .then((resp) => {
      const { albumInfo, category: cat } = resp.data.data;
      yuId = albumInfo.id;
      name = albumInfo.name;
      updatedAt = albumInfo.updatedAt;
      category = cat.map((cat) => {
        return { name: cat.name, value: cat.name.toLowerCase() };
      });
    })
    .catch((error) => {
      console.log(error.response);
    });
  return { yuId, name, category, updatedAt };
};

const scrape = async () => {
  for (let i = 1; i <= 1; i++) {
    await axios
      .get(url + `/photos/jayjersey11111/albums?tab=gallery&page=${i}`)
      .then((response) => getAlbums(response.data));
  }
};
scrape();
