const Config = { 
    id: {
        numberDiversity: 36,
        beginPos: 2,
        endPos: 8,
    },
}

function generateId(): string {
    const timestamp = Date.now().toString(Config.id.numberDiversity)
    const randomPart = Math.random().toString(
        Config.id.numberDiversity).substring(Config.id.beginPos, Config.id.endPos)
    return `${timestamp}-${randomPart}`
}

export {
    generateId,
}