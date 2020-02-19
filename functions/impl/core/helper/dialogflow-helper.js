exports.getContext = (outputContexts, contextName) => {
    return outputContexts.filter(item => {return item.name.includes(contextName)})[0];
};

exports.isContextAlive = (outputContexts, contextName) => {
    const d = this.getContext(outputContexts, contextName);
    console.log("Printing context data:");
    console.log(d);
    if (d && d.lifespanCount && d.lifespanCount > 0) {
        return true;
    }
    return true;
};

exports.getCapability = (capabilities, capabilityName) => {
    return capabilities.filter(item => {return item.name.includes(capabilityName)})[0];
};
