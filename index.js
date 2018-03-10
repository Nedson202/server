import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import logger from 'morgan';
import route from './routes/index';

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);

const app = express();

const port = 4000;

// parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// validator to check user input
app.use(expressValidator());

app.use(cors({credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(logger('dev'));

route(app);

app.listen(port);

// setup a default catch-all route for undef-route
app.get('*', (req, res) => {
  res.status(405).json({
    message: 'Welcome to the WeConnect api, this route is unavailable',
    error: true
  });
});

export default app;
