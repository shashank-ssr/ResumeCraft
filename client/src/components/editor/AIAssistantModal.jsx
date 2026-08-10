import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import {
  Sparkles,
  Check,
  RefreshCw,
  Wand2
} from 'lucide-react';
import {
  generateAISummary,
  generateAIBulletPoints
} from '../../utils/storage';

export const AIAssistantModal = ({
  isOpen,
  onClose,
  mode = 'summary',
  initialText = '',
  jobTitle = '',
  onApplyText
}) => {
  const [promptJobTitle, setPromptJobTitle] = useState(
    jobTitle || 'Software Engineer'
  );

  const [promptSkills, setPromptSkills] = useState(
    'React, Node.js, MongoDB, Problem Solving'
  );

  const [targetIndustry, setTargetIndustry] = useState('Technology');

  const [loading, setLoading] = useState(false);
  const [generatedOptions, setGeneratedOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const isSummaryMode = mode === 'summary';

  const handleGenerateSummary = async () => {
    setLoading(true);
    setGeneratedOptions([]);
    setSelectedOption(null);

    try {
      const results = await generateAISummary(
        promptJobTitle,
        promptSkills,
        targetIndustry
      );

      setGeneratedOptions(results || []);

      if (results?.length > 0) {
        setSelectedOption(results[0]);
      }
    } catch (error) {
      console.error('AI summary generation failed:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleEnhanceBullets = async () => {
    setLoading(true);
    setGeneratedOptions([]);
    setSelectedOption(null);

    try {
      const results = await generateAIBulletPoints(
        initialText,
        promptJobTitle
      );

      setGeneratedOptions(results || []);

      if (results?.length > 0) {
        setSelectedOption(results[0]);
      }
    } catch (error) {
      console.error('AI bullet enhancement failed:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleApply = () => {
    if (!selectedOption) return;

    onApplyText(selectedOption);
    onClose();
  };
  const handleClose = () => {
    if (loading) return;

    setGeneratedOptions([]);
    setSelectedOption(null);
    onClose();
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        isSummaryMode
          ? 'AI Summary'
          : 'Improve with AI'
      }
      maxWidth="max-w-xl"
    >
      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              {isSummaryMode
                ? 'Create a professional summary'
                : 'Improve your resume content'}
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed">
              {isSummaryMode
                ? 'Provide a few details and generate professional summary options.'
                : 'Use AI to rewrite your existing content with clearer and stronger wording.'}
            </p>
          </div>
        </div>
        {isSummaryMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Target job title
              </label>
              <input
                type="text"
                value={promptJobTitle}
                onChange={(e) => setPromptJobTitle(e.target.value)}
                placeholder="e.g. Frontend Developer"
                className="
                  w-full
                  px-3
                  py-2
                  text-sm
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Industry
              </label>
              <select
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                className="
                  w-full
                  px-3
                  py-2
                  text-sm
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              >
                <option value="Technology">
                  Technology
                </option>

                <option value="Finance">
                  Finance
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Marketing">
                  Marketing
                </option>

                <option value="Design">
                  Design
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Skills
                <span className="text-slate-400 font-normal">
                  {' '}optional
                </span>
              </label>
              <input
                type="text"
                value={promptSkills}
                onChange={(e) => setPromptSkills(e.target.value)}
                placeholder="React, Node.js, SQL..."
                className="
                  w-full
                  px-3
                  py-2
                  text-sm
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateSummary}
              disabled={loading || !promptJobTitle.trim()}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                bg-blue-600
                hover:bg-blue-700
                rounded-lg
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Generate
                </>
              )}
            </button>
          </div>
        )}
        {!isSummaryMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Current content
              </label>

              <textarea
                rows={5}
                value={initialText}
                readOnly
                className="
                  w-full
                  px-3
                  py-2
                  text-sm
                  bg-slate-50
                  border
                  border-slate-200
                  rounded-lg
                  text-slate-600
                  resize-none
                  outline-none
                "
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Target job title
              </label>
              <input
                type="text"
                value={promptJobTitle}
                onChange={(e) => setPromptJobTitle(e.target.value)}
                placeholder="e.g. Backend Developer"
                className="
                  w-full
                  px-3
                  py-2
                  text-sm
                  bg-white
                  border
                  border-slate-300
                  rounded-lg
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-500/10
                "
              />
            </div>
            <button
              type="button"
              onClick={handleEnhanceBullets}
              disabled={loading || !initialText.trim()}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                bg-blue-600
                hover:bg-blue-700
                rounded-lg
                transition-colors
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Improving...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  Improve with AI
                </>
              )}
            </button>
          </div>
        )}
        {generatedOptions.length > 0 && (
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Suggestions
              </h3>
              <span className="text-xs text-slate-400">
                {generatedOptions.length} options
              </span>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {generatedOptions.map((option, index) => {
                const isSelected = selectedOption === option;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setSelectedOption(option)}
                    className={`
                      w-full
                      text-left
                      p-3
                      rounded-lg
                      border
                      transition-colors
                      ${isSelected
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`
                          text-xs
                          font-medium
                          ${isSelected
                            ? 'text-blue-700'
                            : 'text-slate-500'
                          }
                        `}
                      >
                        Option {index + 1}
                      </span>
                      {isSelected && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{option}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="
              px-4
              py-2
              text-sm
              font-medium
              text-slate-600
              hover:bg-slate-100
              rounded-lg
              transition-colors
              disabled:opacity-50
            "
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleApply}
            disabled={!selectedOption || loading}
            className="
              px-4
              py-2
              text-sm
              font-medium
              text-white
              bg-blue-600
              hover:bg-blue-700
              rounded-lg
              transition-colors
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};