import { format } from "date-fns";
import enGb from "date-fns/locale/en-GB";
import parseISO from "date-fns/parseISO";

export function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str + Math.floor(Math.random() * 1000) + 1;
}

/////////////
export function formatDate(date) {
  return format(parseISO(date), "do-MMM-yy  HH:mm", {
    locale: enGb,
  });
}
