import 'dotenv/config'
import dotEnv from 'dotenv'

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`
  dotEnv.config({ path: configFile })
} else {
  dotEnv.config()
}

export const {
  PORT,
  //   DB_URL,
  //   APP_SECRET,
  //   EXCHANGE_NAME,
  //   MSG_QUEUE_URL,
  //   CUSTOMER_SERVICE,
  //   SHOPPING_SERVICE,
} = process.env
