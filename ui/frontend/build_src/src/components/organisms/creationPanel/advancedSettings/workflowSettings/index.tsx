import React from "react";
import { useImageCreate } from "../../../../../stores/imageCreateStore";

import { useCreateUI } from "../../creationPanelUIStore";

import {
  SettingItem,
} from "../../../../../styles/shared.css";

import {
  buttonStyle,
} from "../../../../_recipes/button.css";

import { useTranslation } from "react-i18next";

export default function WorkflowSettings() {
  const { t } = useTranslation();

  const numOutputs = useImageCreate((state) =>
    state.getValueForRequestKey("num_outputs")
  );
  const parallelCount = useImageCreate((state) => state.parallelCount);

  const setRequestOption = useImageCreate((state) => state.setRequestOptions);
  const setParallelCount = useImageCreate((state) => state.setParallelCount);
  const shouldStreamImages = useImageCreate((state) => state.getValueForRequestKey("stream_image_progress"));

  const workflowOpen = useCreateUI((state) => state.isOpenAdvWorkflowSettings);
  const toggleWorkflowOpen = useCreateUI(
    (state) => state.toggleAdvWorkflowSettings
  );

  return (
    <div>
      <button type="button" className={buttonStyle({
        type: 'action',
        color: 'accent',
      })} onClick={toggleWorkflowOpen}>
        Workflow Settings
      </button>
      {workflowOpen && (
        <>
          <div className={SettingItem}>
            <label>
              {t("settings.amount-of-img")}{" "}
              <input
                type="number"
                value={numOutputs}
                onChange={(e) =>
                  setRequestOption("num_outputs", parseInt(e.target.value, 10))
                }
                size={4}
              />
            </label>
          </div>
          <div className={SettingItem}>
            <label>
              {t("settings.how-many")}
              <input
                type="number"
                value={parallelCount}
                onChange={(e) => setParallelCount(parseInt(e.target.value, 10))}
                size={4}
              />
            </label>
          </div>

          <div className={SettingItem}>
            <label>
              {t("settings.stream-img")}
              <input
                type="checkbox"
                checked={shouldStreamImages}
                onChange={(e) =>
                  setRequestOption("stream_image_progress", e.target.checked)
                }
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}
