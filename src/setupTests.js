import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
jest.mock('./services/blogs')

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

window.localStorage = localStorageMock