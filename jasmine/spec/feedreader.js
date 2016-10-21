/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
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
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        // This test checks that all feed URLs are defined and not empty.
        it('feed URL is defined', function() {
            // Loop through allFeeds and test each element against the expects.
            for (var i = 0; i < allFeeds.length; i++) {
                var url = allFeeds[i].url;
                expect(url).toBeDefined();
                expect(url.length).toBeGreaterThan(0);
            }
        });

        // This test checks that all feed names are defined and not empty.
        it('feed name is defined', function() {
            // Loop through allFeeds and test each element against the expects.
            for (var i = 0; i < allFeeds.length; i++) {
                var name = allFeeds[i].name;
                expect(name).toBeDefined();
                expect(name.length).toBeGreaterThan(0);
            }
        });
    });

    // This test suite targets the functionality of the menu.
    describe('The menu', function() {
        // Store a jQuery reference to the menu icon and the body element.
        var menuIcon = $('.menu-icon-link');
        var body = $('body');

        // This test checks that the menu element is hidden by default.
        it('is hidden by default', function() {
            // Check if body has menu-hidden class by default.
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures the menu element toggle its visibility when the
         * menu button is clicked.
         */
        it('changes visibility on click', function() {
            // Trigger a click event and check menu-hidden is gone from body.
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(false);
            // Trigger a click event again and check menu-hidden is back.
            menuIcon.trigger('click');
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    // This suite targets the functionality of the loadFeed function.
    describe('Initial Entries', function() {
        /* Run loadFeed before the test case, pass jasmine done into loadFeed
         * which is then executed when async action finish, and jasmine then
         * runs the test case.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test ensures that after loadFeed function is called and
         * completed, there is at least a single .entry element within the .feed
         * container.
         */
        it('loads at least 1 entry in the feed container', function() {
            /* Use jQuery to return a collection of '.entry' items and check the
             * length is greater than 0.
             */
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    // This suite targets the functionality of changing feed.
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
                entryTextFirstLoad = $('.feed .entry').first().find('h2').text();
                /* Then call loadFeed again to load the second feed in allFeeds.
                 * On finish execute jasmine done function, so the test case
                 * can then be run.
                 */
                loadFeed(1, done);
            };
            // Load the first feed in allFeeds, on finish execute secondLoad.
            loadFeed(0, secondLoad);
        });

        /* This test ensures when a new feed is loaded by the loadFeed function
         * the content actually changes.
         */
        it('changes the content in the feed container', function() {
            /* Compare the text entry of the second load with the first load and
             * they should not be equal.
             */
            expect($('.feed .entry').first().find('h2').text()).not.toBe(entryTextFirstLoad);
        });
    });
}());
