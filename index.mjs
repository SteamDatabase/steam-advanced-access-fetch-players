#!/usr/bin/env node

import inquirer from "inquirer";
import SteamUser from "steam-user";

class SimpleSteamApp {
	constructor() {
		this.client = new SteamUser();
		this.client.on("loggedOn", () => console.log("Logged into Steam!"));
		this.client.on("error", this.onError.bind(this));
		this.client.on("disconnected", this.onDisconnected.bind(this));
		this.client.on("accountInfo", this.onAccountInfo.bind(this));
		this.client.on("steamGuard", this.onSteamGuard.bind(this));
	}

	logOn(accountName, password) {
		this.client.logOn({
			accountName,
			password,
			rememberPassword: true,
		});
	}

	onError(e) {
		console.log(e);
	}

	onDisconnected(eResult, msg) {
		console.log(`Disconnected: ${msg}`);
	}

	onAccountInfo() {
		console.log();

		inquirer
			.prompt([
				{
					type: "input",
					name: "appid",
					message: "AppID to get players for:",
					validate: (input) => input.length > 0,
				},
			])
			.then((result) => {
				this.client.getPlayerCount(result.appid, (err, players) => {
					if (err) {
						console.error("Error:", err.message);
					} else {
						console.log("Players:", players);
					}

					this.onAccountInfo();
				});
			});
	}

	onSteamGuard(domain, callback) {
		inquirer
			.prompt([
				{
					type: "input",
					name: "code",
					message: domain ? `Steam guard code sent to ${domain}:` : "Steam app code:",
					validate: (input) => input.length === 5,
				},
			])
			.then((result) => callback(result.code));
	}

	init() {
		process.on("SIGINT", () => {
			this.shutdown(0);
		});

		const validate = (input) => input.length > 0;

		inquirer
			.prompt([
				{
					type: "input",
					name: "username",
					message: "Steam username:",
					validate,
				},
				{
					type: "password",
					name: "password",
					message: "Steam password:",
					mask: "*",
					validate,
				},
			])
			.then((result) => this.logOn(result.username, result.password));
	}

	shutdown(code) {
		console.log("Logging off and shutting down...");

		this.client.logOff();
		this.client.once("disconnected", () => {
			process.exit(code);
		});

		setTimeout(() => {
			process.exit(code);
		}, 500);
	}
}

const app = new SimpleSteamApp();
app.init();
