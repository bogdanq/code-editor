import { useUnit } from "effector-react";
import { $docs } from "./model";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export const useDoc = () => {
  const docs = useUnit($docs);

  const { docId } = useParams();

  const doc = useMemo(
    () => docs.find((doc) => doc.id === docId),
    [docs, docId]
  );

  return doc;
};
