/* eslint-disable object-shorthand */
import { QuestionTree } from "../types/questions";
import { _getYesNoValidator, _integerValidator, _outputDirQuestion } from "./common";
import * as commonQs from "./commonQs";

const _outputUserInputs: QuestionTree = commonQs.outputUserInputs;
_outputUserInputs.transformerValidator = _getYesNoValidator(_outputUserInputs, _outputDirQuestion, "y");

const _tesseraQuestion: QuestionTree = commonQs.tesseraQuestion;
_tesseraQuestion.transformerValidator = _getYesNoValidator(_tesseraQuestion, _outputUserInputs, "y");

const _permissionQuestion: QuestionTree = commonQs.permissionQuestion;
_permissionQuestion.transformerValidator = _getYesNoValidator(_permissionQuestion, _tesseraQuestion, "y");

const _staticNodesQuestion: QuestionTree = commonQs.staticNodesQuestion;
_staticNodesQuestion.transformerValidator = _getYesNoValidator(_staticNodesQuestion, _permissionQuestion, "y");

const _curveQuestion: QuestionTree = commonQs.curveQuestion;
_curveQuestion.options =
  [
    { label: "secp256k1", value: "k1", nextQuestion: _staticNodesQuestion, default: true },
    { label: "secp256r1", value: "r1", nextQuestion: _staticNodesQuestion }
  ];

const _bootnodesQuestion: QuestionTree = commonQs.bootnodesQuestion;
_bootnodesQuestion.transformerValidator = _integerValidator(_bootnodesQuestion, _curveQuestion, 2);

const _membersQuestion: QuestionTree = commonQs.membersQuestion;
_membersQuestion.transformerValidator = _integerValidator(_membersQuestion, _bootnodesQuestion, 1);

const _validatorsQuestion: QuestionTree = commonQs.validatorsQuestion;
_validatorsQuestion.transformerValidator = _integerValidator(_validatorsQuestion, _membersQuestion, 4);

const _txnSizeLimitQuestion: QuestionTree = commonQs.txnSizeLimitQuestion;
_txnSizeLimitQuestion.transformerValidator = _integerValidator(_txnSizeLimitQuestion, _validatorsQuestion);

const _maxCodeSizeQuestion: QuestionTree = commonQs.maxCodeSizeQuestion;
_maxCodeSizeQuestion.transformerValidator = _integerValidator(_maxCodeSizeQuestion, _txnSizeLimitQuestion);

const _coinbaseQuestion: QuestionTree = commonQs.coinbaseQuestion;
_coinbaseQuestion.transformerValidator = _integerValidator(_coinbaseQuestion, _maxCodeSizeQuestion);

const _gasLimitQuestion: QuestionTree = commonQs.gasLimitQuestion;
_gasLimitQuestion.transformerValidator = _integerValidator(_gasLimitQuestion, _coinbaseQuestion);

const _difficultyQuestion: QuestionTree = commonQs.difficultyQuestion;
_difficultyQuestion.transformerValidator = _integerValidator(_difficultyQuestion, _gasLimitQuestion, 1);

export const _chainIDQuestion: QuestionTree = commonQs.chainIDQuestion;
_chainIDQuestion.transformerValidator = _integerValidator(_chainIDQuestion, _difficultyQuestion);
