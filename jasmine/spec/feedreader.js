/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    // Store a jQuery reference to the feed container.
    var feed = $('.feed');

    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('feed URL is defined', function() {
            // Loop through allFeeds and test each element against the expects.
            for (var i = 0; i < allFeeds.length; i++) {
                var url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.length).toBeGreaterThan(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('feed name is defined', function() {
            // Loop through allFeeds and test each element against the expects.
            for (var i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).toBeGreaterThan(0);
            }
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        // Store a jQuery reference to the menu icon.
        var menuIcon = $('.menu-icon-link');

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() {
            // Check if body has menu-hidden class by default.
            expect(document.body.className).toBe('menu-hidden');
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('changes visibility on click', function() {
            // Trigger a click event and check menu-hidden is gone from body.
            menuIcon.trigger('click');
            expect(document.body.className).toBe('');
            // Trigger a click event again and check menu-hidden is back.
            menuIcon.trigger('click');
            expect(document.body.className).toBe('menu-hidden');
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* Run loadFeed before the test case, pass jasmine done into loadFeed
         * which is then executed when async action finish, and jasmine then
         * runs the test case.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('loads at least 1 entry in the feed container', function() {
            /* Use jQuery to return a collection of '.entry' items and check the
             * length is greater than 0.
             */
            expect(feed.find('.entry').length).toBeGreaterThan(0);
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        // Create a reference for a feed entry's text.
        var entryTextFirstLoad;

        beforeEach(function(done) {
            /* Create a function secondLoad. This function is passed to the
             * first call of loadFeed to be executed after async action finish.
             * By placing this function under the callback of beforeEach, it has
             * reference to the jasmine done function.
             */
            var secondLoad = function() {
                /* Immediately store the text of the first feed entry of the
                 * first load for later comparison.
                 */
                entryTextFirstLoad = feed.find('.entry').first().find('h2').text();
                /* Then call loadFeed again to load the second feed in allFeeds.
                 * On finish execute jasmine done function, so the test case
                 * can then be run.
                 */
                loadFeed(1, done);
            };
            // Load the first feed in allFeeds, on finish execute secondLoad.
            loadFeed(0, secondLoad);
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('changes the content in the feed container', function() {
            /* Compare the text entry of the second load with the first load and
             * they should not be equal.
             */
            expect(feed.find('.entry').first().find('h2').text()).not.toBe(entryTextFirstLoad);
        });
    });
}());
