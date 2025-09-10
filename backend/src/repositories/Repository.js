class Repository {
  constructor(model) {
    this.model = model
  }

  async create(data, session = null) {
    const options = session ? { session } : {}
    return await this.model.create([data], options).then((res) => res[0])
  }

  async find(
    filter = {},
    options = {
      populate: null,
      limit: null,
      skip: null,
      sort: null,
      projection: null,
      session: null,
    }
  ) {
    const { populate, limit, skip, sort, projection, session } = options

    let query = this.model.find(filter, projection, { session })

    if (populate) {
      if (Array.isArray(populate)) {
        populate.forEach((populateOption) => {
          query = query.populate(populateOption)
        })
      } else {
        query = query.populate(populate)
      }
    }

    if (sort) query = query.sort(sort)
    if (skip) query = query.skip(skip)
    if (limit) query = query.limit(limit)

    return await query.exec()
  }

  async findOne(filter, projection, session) {
    const options = session ? { session } : {}
    return this.model.findOne(filter, projection, options)
  }

  async update(filter, data, session) {
    const options = session ? { session } : {}
    return this.model.findOneAndUpdate(filter, data, { new: true, options })
  }

  async remove(filter, session) {
    const options = session ? { session } : {}
    return this.model.findOneAndDelete(filter, options)
  }

  async count(filter, session) {
    const options = session ? { session } : {}
    return this.model.countDocuments(filter, options)
  }
}

export default Repository
