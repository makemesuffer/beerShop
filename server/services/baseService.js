class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async add(data) {
    const { id, param, payload } = data;
    await this.repository.push({ _id: id, action: { [param]: payload } });
    return {
      success: "true"
    };
  }

  async delete(data) {
    const { id, param, payload } = data;
    await this.repository.pull({ _id: id, action: { [param]: payload } });
    return {
      success: "true"
    };
  }

  find(id) {
    return this.repository.find("_id", id);
  }
}

module.exports = BaseService;
