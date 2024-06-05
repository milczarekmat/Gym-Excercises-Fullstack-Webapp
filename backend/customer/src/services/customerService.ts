import { AppEventPayload } from '../api/appEvents'
import { CustomerRepository } from '../database'

import {
  FormateData,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from '../utils'

class CustomerService {
  repository: CustomerRepository

  constructor() {
    this.repository = new CustomerRepository()
  }

  async SignIn(userInputs: { email: string; password: string }) {
    const { email, password } = userInputs

    const existingCustomer = await this.repository.FindCustomer({ email })

    if (existingCustomer) {
      const validPassword = await ValidatePassword(
        password,
        existingCustomer.password as string,
        existingCustomer.salt as number
      )
      if (validPassword) {
        const token = await GenerateSignature({
          email: existingCustomer.email,
          _id: existingCustomer._id,
        })
        return FormateData({ id: existingCustomer._id, token })
      }
    }

    return FormateData(null)
  }

  async SignUp(userInputs: { email: string; password: string }) {
    const { email, password } = userInputs

    // create salt
    let salt = await GenerateSalt()

    let userPassword = await GeneratePassword(password, salt)

    const existingCustomer = await this.repository.CreateCustomer({
      email,
      password: userPassword,
      salt,
    })

    const token = await GenerateSignature({
      email: email,
      _id: existingCustomer._id,
    })
    return FormateData({ id: existingCustomer._id, token })
  }

  async GetProfile(id: string) {
    const existingCustomer = await this.repository.FindCustomerById({ id })
    return FormateData(existingCustomer)
  }

  //   async GetWishList(customerId) {
  //     const wishListItems = await this.repository.Wishlist(customerId)
  //     return FormateData(wishListItems)
  //   }

  //   async AddToWishlist(customerId, product) {
  //     const wishlistResult = await this.repository.AddWishlistItem(
  //       customerId,
  //       product
  //     )
  //     return FormateData(wishlistResult)
  //   }

  async SubscribeEvents(payload: AppEventPayload) {
    console.log('Triggering.... Customer Events')

    // const payloadObj = JSON.parse(payload) as { event: string; data: any }

    const { event, data } = payload

    const { userId, product, order, qty } = data

    switch (event) {
      //   case 'ADD_TO_WISHLIST':
      //   case 'REMOVE_FROM_WISHLIST':
      //     this.AddToWishlist(userId, product)
      //     break
      //   case 'ADD_TO_CART':
      //     this.ManageCart(userId, product, qty, false)
      //     break
      //   case 'REMOVE_FROM_CART':
      //     this.ManageCart(userId, product, qty, true)
      //     break
      //   case 'CREATE_ORDER':
      //     this.ManageOrder(userId, order)
      //     break
      default:
        break
    }
  }
}

export default CustomerService
