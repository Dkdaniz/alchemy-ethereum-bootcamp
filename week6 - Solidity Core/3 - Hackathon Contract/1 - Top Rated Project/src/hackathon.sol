// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Hackathon {
    struct Project {
        string title;
        uint[] ratings;
    }
    
    Project[] projects;

    // TODO: add the findWinner function

    function totalRatingProject(uint256 indexProject, uint256 ratingsLength) internal view returns (uint256) {
        uint256 totalRatings;
        for(uint256 j = 0; j < ratingsLength; j++){
            totalRatings += projects[indexProject].ratings[j];
        }

        return totalRatings;
    }

    function findWinner() external view returns (Project memory){
        require(projects.length > 0, "without project to find winner");
        uint256 winnerIndex;
        uint256 winnerHighestAverageRating;
        uint256 projectsLength = projects.length;

        for(uint256 i = 0; i < projectsLength; i++){
            uint256 ratingsLength = projects[i].ratings.length;
            uint256 totalRatings = totalRatingProject(i, ratingsLength);
            
            uint256 highestAverageRating = totalRatings / ratingsLength;
            if(highestAverageRating > winnerHighestAverageRating) {
                winnerIndex = i;
                winnerHighestAverageRating = highestAverageRating;
            }
        }

        return projects[winnerIndex];
    }

    function newProject(string calldata _title) external {
        // creates a new project with a title and an empty ratings array
        projects.push(Project(_title, new uint[](0)));
    }

    function rate(uint _idx, uint _rating) external {
        // rates a project by its index
        projects[_idx].ratings.push(_rating);
    }
}

