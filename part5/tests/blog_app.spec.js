const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Gabe',
        username: 'Gabe',
        password: 'abcd'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Personal Blogs')).toBeVisible()
  })

  test('login form can be opend', async ({ page }) => {
    await loginWith(page, 'Gabe', 'abcd')

    await expect(page.getByText('Gabe logged in')).toBeVisible()
  })

  test('failed login displays correct error message', async ({ page }) => {
    await loginWith(page, 'Gabe', 'wrong')
    const errorDiv = await page.locator('.error')
    await expect(errorDiv).toContainText('Wrong Credentials')

    await expect(page.getByText('Gabe logged in')).not.toBeVisible()
  })


  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Gabe', 'abcd')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, "Bing Rilling", "Rizz Billington", "http//www.zombo.com")
      await expect(page.getByText('Bing Rilling by Rizz Billington added')).toBeVisible()
    })

    test('liking blog increments likes by 1', async ({ page }) => {
      await createBlog(page, "Bing Rilling", "Rizz Billington", "http//www.zombo.com")
      await page.getByRole('button', { name: "View Details" }).click()


      await page.getByRole('button', { name: "Like" }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })
  })


})