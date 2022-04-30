const ApplicationError = require('../util/errors/ApplicationError');

class BaseTransformer {

    constructor(req, data, transformOptions = null) {
        if (this.constructor === BaseTransformer) {
            throw new TypeError('Abstract class "BaseTransformer" cannot be instantiated directly.');
        }
        this.req = req;
        this.data = data;
        this.transformOptions = transformOptions;
        this.paramKey = App.helpers.config('settings.transformer.paramKey');
        this.params = req.getParam(this.paramKey);
        this.allQueryParams = (!App.lodash.isEmpty(this.params)) ? this.params.split(',').filter(Boolean) : [];
    }

    async getTimestamps() {
        let syncData = await this.data;
        return {
            created_at: App.helpers.formatDate(syncData.createdAt),
            updated_at: App.helpers.formatDate(syncData.updatedAt),
        };
    }

    init() {
        return this.getAll();
    }

    async getAll() {
        return Promise.all([
            this.transform(this.data),
            // this.getTimestamps(),
        ]).then(async ([transformed, timestamps]) => {
            let includesData = (App.helpers.getObjProp(this.transformOptions, 'excludeIncludes')) ? {} : await this.getIncludeData();
            return App.helpers.cloneObj(transformed, timestamps, includesData);
        });
    }


}

module.exports = BaseTransformer;