When games are available early to pre-purchase owners or deluxe package owners
(this is called "[Advanced Access](https://help.steampowered.com/en/faqs/view/453F-5C96-EAC2-9145)")
the way it works is that there is a release state override for these owners,
but the game itself is not released. As such, most community features are not available until
the official release including viewing others' achievements, family sharing, getting the player count, and more.

It is possible to get CCU from an account that owns the game with early access. Because of this,
it is possible to make SteamDB track games like it, but it requires our bot to own the game with advanced access.

If you are a game publisher, [please donate a key to your game](https://steamdb.info/keys/)
(or provide it using curator connect) so we can track player counts.

This repository contains a basic script that uses [node-steam-user](https://github.com/DoctorMcKay/node-steam-user),
an open-source library that connects to the Steam network, same way an actual Steam client does,
and allows you to get the concurrent players count for the specified appid using your account.
If you have access to a game (e.g. deluxe edition for a game that is currently in advanced access),
then Steam will return the CCU for you.

Usage:

1. Install [Node.js](https://nodejs.org/)
2. Run `npm install`
3. Run `node index.mjs`
