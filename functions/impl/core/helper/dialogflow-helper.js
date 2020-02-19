exports.getContext = (outputContexts, contextName) => {
    return outputContexts.filter(item => {return item.name.includes(contextName)})[0];
};

exports.getCapability = (capabilities, capabilityName) => {
    return capabilities.filter(item => {return item.name.includes(capabilityName)})[0];
};