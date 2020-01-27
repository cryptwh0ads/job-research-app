var fetch = require("node-fetch");
var redis = require("redis"),
  client = redis.createClient();

const { promisify } = require("util");
// const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

const baseURL = "https://jobs.github.com/positions.json";

fetchGithub = async () => {
  console.log("fetching github");
  let pageCount = 1,
    onPage = 0;
  const allJobs = [];

  while (pageCount > 0) {
    const res = await fetch(`${baseURL}?page=${onPage}`);
    const jobs = await res.json();
    allJobs.push(...jobs);
    pageCount = jobs.length;
    console.log("got", pageCount, "jobs");
    onPage++;
  }

  console.log("got", allJobs.length, "jobs total");
  const success = await setAsync("github", JSON.stringify(allJobs));

  console.log({ success });
};

fetchGithub();

module.exports = fetchGithub;
