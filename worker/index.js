var CronJob = require("cron").CronJob;

const fetchGithub = require("./tasks/fetchGithub");

// fetch github jobs
new CronJob(" * * * * * ", fetchGithub, null, true, "America/Sao_Paulo");
