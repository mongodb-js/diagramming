# Contributing Guide

Thank you for taking the time to contribute. This guide outlines how to structure your work so it aligns with the standards of the project. Please follow these conventions to ensure consistency and maintainability.

## Pull requests and commits

To maintain consistency and clarity in your version control practices, follow these rules for naming pull requests and commit messages.

### Pull request naming
All pull requests should begin with a clear prefix indicating the nature of the change, followed by the related ticket ID and a brief description.

Format:
```
<type>/<ticket-ID>-<description>
```

Where the type is: 
* `feature` for new functionality
* `bugfix` for resolving issues or defects
* `chore` for minor internal changes.

For example: `feature/MIG-9999-add-new-edge`

### Commit message format
Write commit messages that are straightforward, clear, and describe a single purpose. Similar to pull request naming, the format is something like the following:

```
<type>/<ticket-ID> <short description>
```

For example: `feature/MIG-9999 Add a new type of edge`

## Styling

Use Emotion with the [styled component approach](https://emotion.sh/docs/styled).

Example:
```
import styled from '@emotion/styled';

const Container = styled.div`
    padding: 16px;
    background: white;
`;
```

## File naming

Use lowercase and kebab-case for all filenames.

Correct:
* `bezier-edge.tsx`
* `bezier-edge.test.tsx`

Incorrect:
* `BezierEdge.tsx`

## Tests

- Every test file should contain a single "describe" block
- The "describe" block name should match the file name
- Write meaningful test cases that cover core functionality

Example:
```
describe('bezier-edge', () => {
    it('Renders an edge', () => {
        // test logic
    });
});
```

## File locations

Place test and story files in the same folder as the component they relate to.

Example structure:
```
components/
└── edges/
├── bezier-edge.tsx
├── bezier-edge.test.tsx
└── bezier-edge.stories.tsx
```

## Bugs

Please raise bugs in Jira in the [Relational Migrator Backlog](https://jira.mongodb.org/secure/RapidBoard.jspa?rapidView=1770&projectKey=MIG)

When creating a ticket, please ensure that these fields are correctly filled:
- Assigned team: `Relational Migrator`
- Labels: `diagramming`
