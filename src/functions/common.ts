const CNFG = {
    ID: {
        NUMBER_DIVERSITY: 36,
        BEGIN_POS: 2,
        END_POS: 8,
    },
}

function generateId(): string {
    const timestamp = Date.now().toString(CNFG.ID.NUMBER_DIVERSITY)
    const randomPart = Math.random().toString(
        CNFG.ID.NUMBER_DIVERSITY).substring(CNFG.ID.BEGIN_POS, CNFG.ID.END_POS)
    return `${timestamp}-${randomPart}`
}

export {
    generateId,
}