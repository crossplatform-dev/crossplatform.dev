import React, { useState } from 'react';
import styles from './RecommendationWizard.module.css';
import { questions } from '../data/questions.js';
import { technologies } from '../data/technologies.js';

const State = {
  Waiting: 'waiting',
  Questioning: 'questioning',
  Ended: 'ended',
};

/**
 * Based on the user's answers returns a list of technologies
 * to look at in order of priority.
 */
const getRecommendations = (selectedTags) => {
  const scoredTechnologies = [];
  for (const technology of technologies) {
    let score = 0;
    let add = true;

    for (const tag of selectedTags) {
      const [feature, deal] = tag.split('-');
      const weight = technology.categories[feature];
      if ((deal === 'deal' && typeof weight === 'undefined') || weight === 0) {
        // A 0 score on a category is a deal breaker
        console.log(
          `${technology.name} removed because of ${feature} is missing and it's a deal breaker`
        );
        add = false;
        break;
      }
      score += weight || 0;
    }

    if (add) {
      scoredTechnologies.push({
        name: technology.name,
        normalizedName: technology.normalizedName,
        score,
      });
    }
  }

  const sortedTechnologies = scoredTechnologies.sort(
    (technologyA, technologyB) => {
      if (technologyA.score < technologyB.score) {
        return 1;
      }
      if (technologyA.score == technologyB.score) {
        return 0;
      }

      if (technologyA.score > technologyB.score) {
        return -1;
      }
    }
  );
  return sortedTechnologies;
};

const FinalRecommendation = ({ restart, selections }) => {
  const technologies = getRecommendations(selections);
  if (technologies.length === 0) {
    return (
      <div>
        <p>
          We could not find any technology that checks all your criteria. Please
          try again changing some of the values (like the targetted platforms).
        </p>
        <button onClick={restart} className="button button--secondary">
          Start again!
        </button>
      </div>
    );
  }
  return (
    <div>
      <p>
        Based on your answers the technologies we think you should investigate
        are:
      </p>
      <ul>
        {technologies.map((technology) => {
          return (
            <li>
              <a href={`/docs/${technology.normalizedName}`}>
                {technology.name}
              </a>
            </li>
          );
        })}
      </ul>
      <button onClick={restart} className="button button--secondary">
        Start again!
      </button>

      <p>
        Doesn't seem right? Open an{' '}
        <a href="https://github.com/crossplatform-dev/crossplatform.dev/issues/new">
          issue
        </a>{' '}
        with more details!
      </p>
    </div>
  );
};

/**
 *
 * @param {QuestioningProps} param0
 * @returns
 */
const Questioning = ({ questions, done }) => {
  const [question, setQuestion] = useState(questions[0]);
  const [remainingQuestions, setRemainingQuestions] = useState(
    questions.slice(1)
  );
  const [selectedTags, setTags] = useState([]);

  /**
   * Handles the selection changes of inputs in the form to make
   * sure their state is updated in the React side.
   */
  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (value === 'none') {
      return;
    }
    const indexOf = selectedTags.indexOf(value);

    if (checked) {
      if (indexOf === -1) {
        setTags([...selectedTags, value]);
      }
    } else if (indexOf !== -1) {
      selectedTags.splice(indexOf, 1);
      setTags([...selectedTags]);
    }
  };

  /**
   * Updates the user's selection for the current question
   * and moves to the next one or the final step.
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (remainingQuestions.length > 0) {
      setQuestion(remainingQuestions[0]);
      setRemainingQuestions(remainingQuestions.slice(1));
    } else {
      done(selectedTags);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset id="quiz">
        <legend>{question.message}</legend>
        {question.choices.map((choice) => {
          const value = `${choice.value}-${
            question.dealBreaker ? 'deal' : 'noDeal'
          }`;
          return (
            <div key={choice.value}>
              <input
                type={question.type || 'radio'}
                id={choice.value}
                name="question"
                value={value}
                onChange={handleChange}
              />
              <label htmlFor={choice.value}>{choice.name}</label>
              <br />
            </div>
          );
        })}
        <button className="button button--secondary">Next</button>
      </fieldset>
    </form>
  );
};

export default function RecommendationWizard() {
  const [status, setState] = useState(State.Questioning);
  const [selections, setSelections] = useState([]);

  const done = (choices) => {
    setSelections(choices);
    setState(State.Ended);
  };

  const restart = () => {
    setState(State.Questioning);
  };

  let section;
  if (status === State.Waiting) {
    section = <Intro setState={setState} />;
  } else if (status === State.Questioning) {
    section = <Questioning questions={questions} done={done} />;
  } else if (status === State.Ended) {
    section = <FinalRecommendation restart={restart} selections={selections} />;
  }

  return <article>{section}</article>;
}
