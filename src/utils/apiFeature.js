export default class ApiFeature {

    //queryString=>req.query
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryStrin
    }

    pagination() {
        let page = this.queryString.page * 1 || 1;
        if (req.query.page < 0) page = 1;
        let skip = (page - 1) * 4
        ////becase pecause page will return in res
        this.page=page;
        this.mongooseQuery.skip(skip).limit(4)
        return this;
    }
    filter() {
        let filterObj = { ...this.queryString }
        let excutedQuery = ['page', 'sort', 'keyword', 'fields']
        excutedQuery.forEach((q) => {
            delete filterObj[q]
        })
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/\bgt|gte|lt|lte\b/g, match => `$${match}`)
        filterObj = JSON.parse(filterObj)

        this.mongooseQuery.find(filterObj)
        return this
    }
    sort() {
        if (this.queryString.sort) {
            let sortByManyItems = this.queryString.sort.split(",").join(" ")
            this.mongooseQuery.sort(sortByManyItems)
        }
        return this
    }
    search() {
        if (this.queryString.keyword) {
            this.mongooseQuery.find({
                $or: [
                    { title: { $regex: req.query.keyword, $options: "i" } },
                    { description: { $regex: req.query.keyword, $options: "i" } },
                ]
            })
        }
        return this
    }

    fields() {
        if (this.queryString.fields) {
            let fields = req.query.fields.split(",").join(" ");
            console.log(fields);
            this.mongooseQuery.select("title")
        }
        return this
    }
}