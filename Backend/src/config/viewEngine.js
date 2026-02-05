const express = require("express");
const path = require("path");

export const viewEngine = (app) => {
    app.use(
        express.static("./src/public"),
    );
    app.set("views", path.join("./src/view"));
    app.set("view engine", "ejs");
};