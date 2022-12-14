const getPoemBtn = document.getElementById("get-poem");
const poemEl = document.getElementById("poem");
const poemURL = "https://poetrydb.org/random,linecount/1;12/author,title,lines.json";

const getJSON = (url) => fetch(url).then((res) => res.json());

const pipe =
	(...fns) =>
	(firstArg) =>
		fns.reduce((returnValue, fn) => fn(returnValue), firstArg);

const makeTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;

// complete this function
const makePoemHTML = ([{ author, lines, title }]) => {
	const makeTitle = makeTag("h2")(title);
	const makeAuthor = makeTag("h3")(makeTag("em")(`by ${author}`));

	const getStanza = lines.join("<br>");
	const makeStanza = makeTag("p")(getStanza);
	const string = `${makeTitle} ${makeAuthor} ${makeStanza}`;

	return string;
};
// attach a click event to #get-poem
getPoemBtn.onclick = async function () {
	// renders the HTML string returned by makePoemHTML to #poem
	poemEl.innerHTML = makePoemHTML(await getJSON(poemURL));
};
