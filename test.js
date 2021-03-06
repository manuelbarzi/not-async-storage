const AsyncStore = require('.')
const assert = require('assert')

assert(!!AsyncStore, 'AsyncStore exists')
assert(!!AsyncStore.__context__, 'AsyncStore.__context__ exists')

const key = 'hello', value = 'world'

    ; (async () => {
        await AsyncStore.setItem(key, value)
            .then(() => assert.equal(AsyncStore.__context__[key], value, `AsyncStore.setItem sets the value '${value}' for the key '${key}' in the store`))
            .catch(console.error)
            .finally(() => delete AsyncStore.__context__[key])

        AsyncStore.__context__[key] = value
        AsyncStore.__context__[key + 2] = value + 2
        await AsyncStore.getItem(key)
            .then(_value => assert.equal(_value, value, `AsyncStore.getItem returns the value '${value}' for the key '${key}' from the store`))
            .catch(console.error)
            .finally(() => delete AsyncStore.__context__[key])

        AsyncStore.__context__[key] = value
        AsyncStore.__context__[key + 2] = value + 2
        await AsyncStore.removeItem(key)
            .then(() => assert.equal(AsyncStore.__context__[key], undefined, `AsyncStore.removeItem removes value '${value}' for the key '${key}' from store`))
            .then(() => assert.equal(AsyncStore.__context__[key + 2], value + 2, `AsyncStore.removeItem removes value '${value + 2}' for the key '${key + 2}' from store`))
            .catch(console.error)
            .finally(() => delete AsyncStore.__context__[key + 2])

        AsyncStore.__context__[key] = value
        AsyncStore.__context__[key + 2] = value + 2
        await AsyncStore.clear()
            .then(() => assert.equal(AsyncStore.__context__[key], undefined, `AsyncStore.removeItem removes value '${value}' for the key '${key}' from store`))
            .then(() => assert.equal(AsyncStore.__context__[key + 2], undefined, `AsyncStore.removeItem removes value '${value + 2}' for the key '${key + 2}' from store`))
            .catch(console.error)
    })()
        .catch(console.error)
