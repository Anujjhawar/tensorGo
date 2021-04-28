module.exports = {
    IT: it,
    IT_WITH_DEFAULT: itWithDefault,
    IT_WITH_DEFAULT_WITH_ARRAY: itWithDefaultFromArray
}


async function it(dataObject, addFieldsToRemove) {
    let deletField = [];
    if (addFieldsToRemove != null) {
        if (typeof addFieldsToRemove === 'string') {
            addFieldsToRemove = [addFieldsToRemove];
        }
        deletField = deletField.concat(addFieldsToRemove);
    }
    deletField.forEach((e) => {
        delete dataObject[e];
    });
    return dataObject;
}

async function itWithDefault(dataObject, addFieldsToRemove) {
    let deletField = ["createdAt", "updatedAt"];
    if (addFieldsToRemove != null) {
        if (typeof addFieldsToRemove === 'string') {
            addFieldsToRemove = [addFieldsToRemove];
        }
        deletField = deletField.concat(addFieldsToRemove);
    }
    if(dataObject) {
        deletField.forEach((e) => {
            if(dataObject.hasOwnProperty(e)) {
                delete dataObject[e];
            }
        });
    }
    return dataObject;
}


async function itWithDefaultFromArray(arrayDataObject, addFieldsToRemove) {
    let maskData =  [];
    await arrayDataObject.forEach(async (e) => {
        maskData.push(await itWithDefault(e.dataValues, addFieldsToRemove));
    });
    return maskData;
}