import styled from "styled-components";

const styles = {
  /**
   * Default log styles
   */
  LOG_COLOR: "rgba(0,0,0,0.9)",
  LOG_BACKGROUND: "transparent",
  LOG_BORDER: "#F1F1F1",
  LOG_ICON: "none",

  /**
   * Log types
   */
  LOG_WARN_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACkSURBVChTbY7BCoJQFERn0Q/3BX1JuxQjsSCXiV8gtCgxhCIrKIRIqKDVzXl5w5cNHBjm6eGinXiAXu5inY2xYm/mbpIh+vcFhLA3sx0athNUhymEsP+10lAEEA17x8o/9wFuNGnYuVlWve0SQl7P0sBu3aq2R1Q/1JzSkYGd29eqNv2wjdnUuvNRciC/N+qe+7gidbA8zyHkOINsvA/sumcOkjcabcBmw2+mMgAAAABJRU5ErkJggg==)`,
  LOG_WARN_BACKGROUND: "rgb(254, 251, 231)",
  LOG_WARN_COLOR: "#7a653c",
  LOG_WARN_BORDER: "#fef4c7",

  LOG_ERROR_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADESURBVChTY4CB7ZI8tmfU5E6e01b+DMIgNkgMKg0BR9Vkux6YWPx/bemIgkFiIDmwogOaqrYPzazAEm8DwuGKYGyQHEgNw0VT05Mwib9v3v7/kJEHxiA2TDFIDcNNU4vPMFPACj58/P/v40cwGyYOUsNwy8IZRSFIEUgxskKQGoZrzp4ErQapYbgYHG371M4dLACTQGaD5EBqwD6/FpzQ9dTBE64IhkFiIDmwIhi4mlJqey8o4eR9r8jPIAxig8QgsgwMAFZz1YtGPXgjAAAAAElFTkSuQmCC)`,
  LOG_ERROR_BACKGROUND: "#fff0f0",
  LOG_ERROR_BORDER: "#ffd6d6",
  LOG_ERROR_COLOR: "#f44336",

  LOG_DEBUG_ICON: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 459 459'%3e%3cpath fill='%234D88FF' d='M433.5 127.5h-71.4a177.7 177.7 0 0 0-45.9-51L357 35.7 321.3 0l-56.1 56.1c-10.2-2.6-23-5.1-35.7-5.1s-25.5 2.5-35.7 5.1L137.7 0 102 35.7l40.8 40.8a177.7 177.7 0 0 0-45.9 51H25.5v51H79c-2.5 7.7-2.5 17.9-2.5 25.5v25.5h-51v51h51V306a88 88 0 0 0 2.5 25.5H25.5v51h71.4A152.2 152.2 0 0 0 229.5 459c56.1 0 107.1-30.6 132.6-76.5h71.4v-51H380c2.5-7.7 2.5-17.9 2.5-25.5v-25.5h51v-51h-51V204c0-7.7 0-17.9-2.5-25.5h53.5v-51zm-153 204h-102v-51h102v51zm0-102h-102v-51h102v51z'/%3e%3c/svg%3e")`,
  LOG_DEBUG_BACKGROUND: "",
  LOG_DEBUG_BORDER: "",
  LOG_DEBUG_COLOR: "#4D88FF",

  LOG_COMMAND_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABaSURBVChTY6AtmDx5cvnUqVP1oFzsoL+/XwCo8DEQv584caIVVBg7mDBhghxQ4Y2+vr6vU6ZM8YAKYwdA00SB+CxQ8S+g4jCoMCYgSiFRVpPkGaAiHMHDwAAA5Ko+F4/l6+MAAAAASUVORK5CYII=)`,
  LOG_RESULT_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABpSURBVChTY6A92LNnj96uXbvKoVzsYMeOHVbbt29/D1T4eP/+/QJQYVSwe/duD6CCr0B8A8iWgwqjAqBk2NatW38B6bPbtm0TBYkBFbsA+c9ANFgRCBCtEASAAoSthgGiPAMD2IOHgQEA521bM7uG52wAAAAASUVORK5CYII=)`,
  LOG_INFO_ICON: `url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADISURBVChTY4ABp/AztmZBZ07qe538rO114rOa8+GTskYHbKHSEOARd6nLIOTsf61gIA46U6kVePYQiK3uc/K/hPG+LrCi8IyrtkZh5yCKgk/80w46ba0RdGYGhH/2v6rXyf88qtttGVwSLp2ECQLxeiAu1wo6uwpJ7L+o2f6TDA6xZz8jCyqFnuHXCj4djywmZXHoM/EK0azGqhBsNYpngL6VCTnGqRF4xgKo+D5IDO4ZEEAKnjcQBafvqwWf/YoSPDCAP8AZGAC7mLM81zgOTQAAAABJRU5ErkJggg==)`,
};

const Themed = (style: string, method: string) =>
  // @ts-ignore
  styles[`LOG_${method.toUpperCase()}_${style.toUpperCase()}`] ||
  // @ts-ignore
  styles[`LOG_${style.toUpperCase()}`];

/**
 * console-message
 */
export const Message = styled.div<{ method: string }>`
  position: relative;
  display: flex;
  margin-top: -1px;
  margin-bottom: ${(props) => +/^warn|error$/.test(props.method)};
  padding-left: 10px;
  box-sizing: border-box;
  color: ${(props) => Themed("color", props.method)};
  background-color: ${(props) => Themed("background", props.method)};
  border-top: 1px solid ${(props) => Themed("border", props.method)};
  border-bottom: 1px solid ${(props) => Themed("border", props.method)};
  & * {
    vertical-align: top;
    box-sizing: border-box;
    font-family: Menlo, monospace;
    white-space: pre-wrap;
    font-size: 11px;
  }
  & a {
    color: rgb(177, 177, 177);
  }
`;

/**
 * message-icon
 */
export const Icon = styled.div<{ method: string }>`
  width: 10px;
  height: 18px;
  background-image: ${(props) => Themed("icon", props.method)};
  background-repeat: no-repeat;
  background-position: 50% 50%;
`;

/**
 * console-content
 */
export const Content = styled.div`
  clear: right;
  position: relative;
  padding: 3px 22px 2px 0;
  margin-left: 15px;
  min-height: 18px;
  flex: auto;
  width: calc(100% - 15px);
`;

export const Title = styled.div`
  padding: 10px 5px;
`;

export const Wrapper = styled.div<{ ref: React.RefObject<HTMLElement> }>`
  padding: 10px 5px;
  overflow-y: auto;
  max-height: 100%;
`;

export const Root = styled.div<{ ref: React.RefObject<HTMLElement> }>`
  word-break: break-word;
`;
