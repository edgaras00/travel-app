module.exports = class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    // Filter fields
    const ignoredFields = ["page", "limit", "sort", "fields"];
    ignoredFields.forEach((field) => delete queryObject[field]);

    // Create MongoDB operators from the query string
    // gt --> $gt | gte --> $gte
    const queryStr = JSON.stringify(queryObject).replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    // Set query
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const selectedFields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(selectedFields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 50;
    const skip = limit * (page - 1);

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
};
