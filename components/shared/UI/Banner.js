//import ReactMarkdown from "react-markdown";
export default function Banner() {
  const markdown = `
  A paragraph with *emphasis* and **strong importance**.
# Heading level 1
> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
  `;
  return (
    <div
      className="bg-cover border-2 bg-no-repeat bg-center h-48 p-8 rounded-xl max-w-7xl mx-auto bg-blue-700 text-white"
      style={{
        backgroundImage: ``,
      }}
    >
      {/* <ReactMarkdown children={markdown} /> */}
    </div>
  );
}
