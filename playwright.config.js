const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './specs',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // Point directly to your local Go server!
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
    video: 'retain-on-failure', // Records a video of the screen if a test fails!
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
             launchOptions: {
                 args: [
                     '--use-fake-ui-for-media-stream', // Tells Chrome to automatically "Allow" camera/mic prompts for WebRTC
                     '--use-fake-device-for-media-stream' // Feeds a fake video/audio stream into the RTC connection
                 ]
             }
      },
    },
  ],
});
