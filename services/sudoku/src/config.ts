const getConfig = (name: string, defValue = "") => process.env[name] || defValue

export const mongoConStr = getConfig(
  'MONGO_CONNSTR',
  "mongodb://root:example@localhost:27017/sudoku-db?authSource=admin&readPreference=primary&ssl=false");