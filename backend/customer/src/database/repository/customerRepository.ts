import CustomerModel from '../models/Customer'

interface ICustomerData {
  email: string
  password: string
  salt: string | number
}

class CustomerRepository {
  async CreateCustomer({ email, password, salt }: ICustomerData) {
    const customer = new CustomerModel({
      email,
      password,
      salt,
    })

    const customerResult = await customer.save()
    return customerResult
  }

  async FindCustomer({ email }: { email: string }) {
    const existingCustomer = await CustomerModel.findOne({ email: email })
    return existingCustomer
  }

  async FindCustomerById({ id }: { id: string }) {
    const existingCustomer = await CustomerModel.findById(id).populate(
      'address'
    )

    return existingCustomer
  }

  //   async Wishlist(customerId) {
  //     const profile = await CustomerModel.findById(customerId).populate(
  //       'wishlist'
  //     )

  //     return profile.wishlist
  //   }

  //   async AddWishlistItem(
  //     customerId,
  //     { _id, name, desc, price, available, banner }
  //   ) {
  //     const product = {
  //       _id,
  //       name,
  //       desc,
  //       price,
  //       available,
  //       banner,
  //     }

  //     const profile = await CustomerModel.findById(customerId).populate(
  //       'wishlist'
  //     )

  //     if (profile) {
  //       let wishlist = profile.wishlist

  //       if (wishlist.length > 0) {
  //         let isExist = false
  //         wishlist.map((item) => {
  //           if (item._id.toString() === product._id.toString()) {
  //             const index = wishlist.indexOf(item)
  //             wishlist.splice(index, 1)
  //             isExist = true
  //           }
  //         })

  //         if (!isExist) {
  //           wishlist.push(product)
  //         }
  //       } else {
  //         wishlist.push(product)
  //       }

  //       profile.wishlist = wishlist
  //     }

  //     const profileResult = await profile.save()

  //     return profileResult.wishlist
  //   }
}

export default CustomerRepository
