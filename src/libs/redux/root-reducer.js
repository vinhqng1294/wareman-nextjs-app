import { combineReducers } from 'redux';
import { routerReducer as Reducer_Router } from 'react-router-redux';
import { Reducer_Auth } from './auth/auth.reducer';
import { Reducer_ImportRequest } from './warehouse-import-request/import-request.reducer';
import { Reducer_ExportRequest } from './warehouse-export-request/export-request.reducer';
import { Reducer_ProductStock } from './product-stock/product-stock.reducer';
import { Reducer_Warehouse } from './warehouse/warehouse.reducer';

const rootReducer = combineReducers({
  routing: Reducer_Router,
  auth: Reducer_Auth,
  warehouseImportRequest: Reducer_ImportRequest,
  warehouseExportRequest: Reducer_ExportRequest,
  productStock: Reducer_ProductStock,
  warehouse: Reducer_Warehouse,
});

export default rootReducer;
