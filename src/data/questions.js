// Uses inquirer format (https://www.npmjs.com/package/inquirer#questions)
export const questions = [
    {
      category: 'platformSupport',
      message:
        'Does your application need to run on any mobile platform? (Select all that apply)',
      type: 'checkbox',
      dealBreaker: true,
      choices: [
        { name: 'Android', value: 'android' },
        { name: 'iOS', value: 'ios' },
        { name: 'None', value: 'none' },
      ],
    },
    {
      category: 'platformSupport',
      message:
        'Does your application need to run on any desktop platform? (Select all that apply)',
      type: 'checkbox',
      dealBreaker: true,
      choices: [
        { name: 'Linux', value: 'linux' },
        { name: 'macOS', value: 'macos' },
        { name: 'Windows', value: 'windows' },
        { name: 'None', value: 'none' },
      ],
    },
    {
      category: 'visual',
      message:
        'Do you want your application to have a consistent look across platforms or do you want it to look closer to the Operating System?',
      choices: [
        { name: 'Consistent accross platforms', value: 'customUI' },
        { name: 'Match the OS look and feel', value: 'platformUI' },
        { name: 'Indifferent', value: 'none' },
      ],
    },
    {
      category: 'fieldType',
      message:
        'Are you going to start a full new application or does it have to integrate with an existing one?',
      choices: [
        { name: 'New application', value: 'greenfield' },
        { name: 'Existing application', value: 'brownfield' },
      ],
    },
    {
      category: 'targetAudience',
      message: 'Who will be the main user of your application?',
      choices: [
        { name: 'Consumers', value: 'consumers' },
        { name: 'Enterprise users', value: 'enterprise' },
      ],
    },
    {
      category: 'team',
      notes: 'This depends mostly on enterprise users',
      message:
        'Is the application going to have a team working fulltime in the longterm?',
      choices: [
        { name: 'Yes', value: 'longterm' },
        { name: 'No', value: 'shortterm' },
      ],
    },
    {
      category: 'visual',
      message:
        "How visually complex or interactions is going to have your app's main view/page?",
      choices: [
        { name: 'Simple layout or interactions', value: 'simpleLayout' },
        { name: 'Definitely not simple', value: 'complexLayout' },
      ],
    },
    {
      category: 'support',
      message:
        'Do you think you will need to pay for support or would be help from the community be enough?',
      choices: [
        { name: 'Paid support', value: 'paidSupport' },
        { name: 'Community', value: 'community' },
      ],
    },
  ];
