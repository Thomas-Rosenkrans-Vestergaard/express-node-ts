import config from "./util/secrets";
import "./util/logger";
import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import lusca from "lusca";
import path from "path";
import expressValidator from "express-validator";
import hbs from "express-handlebars";
import router from "./controllers/router";

const app = express();

app.set("port", config.getOrDefault("PORT", 3000));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
app.engine("hbs", hbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname + "/../views/layouts"),
    partialsDir: path.join(__dirname + "/../views/partials")
}));

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

app.use(
    express.static(path.join(__dirname, "public"), {maxAge: 31557600000})
);

app.use(router);

export default app;