import { useCallback, useEffect, useState } from "react";

/* Family.jsx */
const updateNodes = (nodes, labelkey, value, found) => {
  if (nodes == null) {
    return;
  }
  nodes.forEach((node) => {
    if (found || node.label.trim() === labelkey.trim()) {
      node.checked = value;
      updateNodes(node.nodes, labelkey, value, true);
    } else {
      if (node.nodes && node.nodes.length) {
        updateNodes(node.nodes, labelkey, value, found);
      }
    }
  });
};

function cloneForest(forest) {
  if (forest == null) return null;
  return forest.map((tree) => {
    return {
      key: tree.key,
      label: tree.label,
      isFolder: tree.isFolder,
      checked: tree.checked,
      hasChildren: tree?.hasChildren,
      nodes: cloneForest(tree.nodes),
    };
  });
}

export default function Treeview({ familyTree }) {
  const [showNested, setShowNested] = useState({});
  const [treeData, setTreeData] = useState([]);
  const [flag, setFlag] = useState(true);

  useEffect(() => {
    setTreeData(familyTree);
  }, [familyTree]);

  // handle show/hide functionality
  const toggleNested = (label) => {
    console.log("label", label);
    setShowNested({ ...showNested, [label]: !showNested[label] });
    setFlag(false);
    // setShowNested(true);
  };

  console.log("setShowNested", showNested);

  const checkBoxClicked = useCallback((label) => {
    setTreeData((currentTreeData) => {
      const newTreeData = cloneForest(currentTreeData);
      updateNodes(newTreeData, label.label, !label.checked, false);
      return newTreeData;
    });
  }, []);

  return (
    <>
      <div>
        {treeData.map((parent) => {
          return (
            <div key={parent.label}>
              {parent.isFolder && (
                <div className="parent">
                  <div>
                    <input
                      type="checkbox"
                      id={parent.label}
                      name={parent.label}
                      value={parent.label}
                      checked={parent.checked ? parent.checked : false}
                      onChange={() => checkBoxClicked(parent)}
                      className="checkbox-round"
                    />
                    {/* <label htmlFor={parent.label}> */}
                    <label>
                      {"  "}
                      {parent.label}
                    </label>
                  </div>
                  <div>
                    <span style={{ float: "right" }}>
                      {!showNested[parent.label] || flag ? (
                        <ion-icon
                          name="chevron-up-outline"
                          onClick={() => toggleNested(parent.label)}
                        ></ion-icon>
                      ) : parent.hasChildren === true ? (
                        <ion-icon
                          name="chevron-down-outline"
                          onClick={() => toggleNested(parent.label)}
                        ></ion-icon>
                      ) : null}
                    </span>
                  </div>
                </div>
              )}

              {!parent.isFolder && (
                <div className="chield">
                  <div
                    style={
                      parent.hasChildren === true
                        ? { marginLeft: "60px" }
                        : { marginLeft: "90px" }
                    }
                  >
                    <input
                      type="checkbox"
                      id={parent.label}
                      name={parent.label}
                      value="Bike"
                      checked={parent.checked ? parent.checked : false}
                      onChange={() => checkBoxClicked(parent)}
                    />
                    <label>
                      {" "}
                      {"  "}
                      {parent.label}
                    </label>
                  </div>
                  <div>
                    <span>
                      {(!showNested[parent.label] || flag) &&
                      parent.hasChildren === true ? (
                        <ion-icon
                          name="chevron-up-outline"
                          onClick={() => toggleNested(parent.label)}
                        ></ion-icon>
                      ) : parent.hasChildren === true ? (
                        <ion-icon
                          name="chevron-down-outline"
                          onClick={() => toggleNested(parent.label)}
                        ></ion-icon>
                      ) : null}
                    </span>
                  </div>
                </div>
              )}

              {/* Base Condition and Rendering recursive component from inside itself */}
              <>
                {(!showNested[parent.label] || flag) &&
                  parent.nodes &&
                  parent.nodes.length > 0 && (
                    <Treeview familyTree={parent.nodes} />
                  )}
              </>
            </div>
          );
        })}
      </div>
    </>
  );
}
