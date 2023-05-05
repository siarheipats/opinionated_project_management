const recentlyOpenedModel = require('../models/recentlyOpenedModel');

const addToTheList = async (req, res, next) => {
    const { recentlyOpenedId, customerId, workspace } = req.body;
    try {
        const list = recentlyOpenedModel.addToTheList(recentlyOpenedId, customerId, workspace);
        if (list === 'error') {
            res.status(400).json({ error: 'Already exists!' });
        }
        res.status(200).json(list);
    } catch (error) {
        res.status(400).json({ error: error.message });
        next(error)
    }
}

const getCustomerList = async (req, res, next) => {
    const customerId = req.params._customerId;
    try {
        let customerList = await recentlyOpenedModel.getListByUserId(customerId);
        res.status(200).json(customerList);
    } catch (error) {
        res.status(400).json({ error: error.message })
        next(error);
    }
}

const updateRecentList = async (req, res) => {
    const { id, recentList } = req.body;
    try {
        const response = await recentlyOpenedModel.updateRecentlyOpened(id, recentList);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { addToTheList, getCustomerList, updateRecentList }