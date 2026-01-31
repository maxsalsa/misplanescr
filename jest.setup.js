import '@testing-library/jest-dom'

jest.mock('lucide-react', () => {
    return new Proxy({}, {
        get: (target, prop) => {
            // Return a simple component for any icon import
            const Icon = (props) => <svg data-testid={`lucide-${String(prop).toLowerCase()}`} {...props} />
            Icon.displayName = String(prop)
            return Icon
        }
    })
})