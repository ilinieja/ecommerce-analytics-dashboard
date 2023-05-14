import { createHandler, Get} from "next-api-decorators";

class RootHandler {
  @Get()
  async getHealth() {
    // TODO: Check db connection.
    return { status: 'OK' };
  }
}

export default createHandler(RootHandler);
