const PORT = 3100;
import {server} from "./server.js";


server.listen(PORT, () => {
    console.log(`social-media app listening on port ${PORT}`)
  });