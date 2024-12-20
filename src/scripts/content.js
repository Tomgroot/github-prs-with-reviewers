import {Octokit} from 'octokit';

var currentURL = window.location.href;
let disabled = false;
let githubToken = '';

chrome.storage.local.get('disabled', function(data) {
    disabled = data.disabled;
});

chrome.storage.local.get('githubToken', function(data) {
    githubToken = data.githubToken;

    if(!disabled && currentURL.includes("https://github.com")) {
        console.log('githubToken', githubToken);


        const octokit = new Octokit({
            auth: githubToken
        });

        document.querySelectorAll('a[data-hovercard-type="pull_request"]').forEach(async (aTag) => {
            const pullRequestPath = aTag.getAttribute('href');
            const pullRequestNumber = pullRequestPath.split('/').pop();
            const ownerRepo = pullRequestPath.split('/').slice(1, 3).join('/');

            try {
                const { data: reviews } = await octokit.rest.pulls.listReviews({
                    owner: ownerRepo.split('/')[0],
                    repo: ownerRepo.split('/')[1],
                    pull_number: pullRequestNumber
                });

                const reviewers = reviews.filter(review => review.state === 'CHANGES_REQUESTED' || review.state === 'APPROVED');
                console.log(`Reviewers for PR ${pullRequestNumber}:`, reviewers);
            } catch (error) {
                console.error(`Error fetching reviews for PR ${pullRequestNumber}:`, error);
            }
        });
        // chrome.runtime.sendMessage({redirect: currentURL.replace('https://app.clickup.com', 'clickup://')});
    }
    console.log('githubToken', githubToken);
});

