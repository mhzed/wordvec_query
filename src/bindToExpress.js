"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const thrift_server_express_1 = require("@creditkarma/thrift-server-express");
const __1 = require("..");
exports.bindToExpress = (app, urlPath, vecDb) => {
    app.use(urlPath, bodyParser.raw(), thrift_server_express_1.thriftExpress(__1.WordvecQueryService.Processor, new __1.WordvecQueryServiceHandler(vecDb)));
    return app;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZFRvRXhwcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJpbmRUb0V4cHJlc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBeUM7QUFDekMsOEVBQW1FO0FBQ25FLDBCQUlZO0FBRUMsUUFBQSxhQUFhLEdBQUcsQ0FBQyxHQUF3QixFQUFFLE9BQWUsRUFBRSxLQUFZO0lBQ25GLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxxQ0FBYSxDQUM1Qyx1QkFBbUIsQ0FBQyxTQUFTLEVBQzdCLElBQUksOEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQ3hDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUMifQ==