import { PathNode } from "@/lib/types";
import { getFileIcon } from "@/lib/fileIcons";
import { useState, useMemo } from "react";

type SortField = "name" | "createdOn" | "size";
type SortOrder = "asc" | "desc";

interface FileTableProps {
  files: PathNode[];
  onSelect: (item: PathNode) => void;
}

export default function FileTable({ files, onSelect }: FileTableProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [sortField, setSortField] = useState<SortField>("createdOn");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc"); // Default: most recent first

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if same field
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // New field, default to ascending (except for date which defaults to desc)
      setSortField(field);
      setSortOrder(field === "createdOn" ? "desc" : "asc");
    }
  };

  const sortedFiles = useMemo(() => {
    const sorted = [...files].sort((a, b) => {
      // Always put folders first
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
          break;
        case "createdOn":
          comparison =
            new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime();
          break;
        case "size":
          // Folders have size 0, files have actual sizes
          if (a.isFolder && b.isFolder) {
            // Both folders, sort by name
            comparison = a.name
              .toLowerCase()
              .localeCompare(b.name.toLowerCase());
          } else if (!a.isFolder && !b.isFolder) {
            // Both files, sort by size
            comparison = a.size - b.size;
          }
          break;
        default:
          comparison = 0;
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted;
  }, [files, sortField, sortOrder]);

  const handleRowClick = (file: PathNode, index: number) => {
    if (selectedIndex === index) {
      // Deselect if clicking the same row
      setSelectedIndex(null);
    } else {
      // Select the new row
      setSelectedIndex(index);
    }
  };

  const handleRowDoubleClick = (file: PathNode) => {
    // Only trigger onSelect for folders on double-click
    if (file.isFolder) {
      onSelect(file);
    }
  };

  const formatDisplayName = (name: string) => {
    // Remove leading '/' if present
    return name.startsWith("/") ? name.substring(1) : name;
  };

  const formatFileSize = (size: number) => {
    if (size === 0) return "-";
    const units = ["B", "KB", "MB", "GB"];
    let unitIndex = 0;
    let fileSize = size;

    while (fileSize >= 1024 && unitIndex < units.length - 1) {
      fileSize /= 1024;
      unitIndex++;
    }

    return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <span className="sort-icon sort-icon-none">⇅</span>;
    }
    return sortOrder === "asc" ? (
      <span className="sort-icon sort-icon-asc">↑</span>
    ) : (
      <span className="sort-icon sort-icon-desc">↓</span>
    );
  };

  return (
    <div className="table-container">
      <table className="table card">
        <thead>
          <tr style={{ display: "flex" }}>
            <th className="sortable-header" onClick={() => handleSort("name")}>
              Name {getSortIcon("name")}
            </th>
            <th
              className="sortable-header"
              onClick={() => handleSort("createdOn")}
            >
              Modified Date {getSortIcon("createdOn")}
            </th>
            <th className="sortable-header" onClick={() => handleSort("size")}>
              File Size {getSortIcon("size")}
            </th>
          </tr>
        </thead>
      </table>
      <div className="table-body-container">
        <table className="table card">
          <tbody>
            {sortedFiles.map((file, index) => (
              <tr
                key={`${file.name}-${index}`}
                onClick={() => handleRowClick(file, index)}
                onDoubleClick={() => handleRowDoubleClick(file)}
                className={`file-row ${
                  selectedIndex === index ? "selected" : ""
                } ${file.isFolder ? "folder-row" : ""}`}
              >
                <td>
                  {file.isFolder ? (
                    <span className="file-icon" title="Folder">
                      {getFileIcon(file.name, file.isFolder)}
                    </span>
                  ) : (
                    <span
                      className={`file-icon ${getFileIcon(
                        file.name,
                        file.isFolder
                      )}`}
                      title={`${
                        file.name.split(".").pop()?.toUpperCase() || "File"
                      } file`}
                    ></span>
                  )}
                  <span className="file-name">
                    {formatDisplayName(file.name)}
                  </span>
                </td>
                <td>{formatDate(file.createdOn)}</td>
                <td>{file.isFolder ? "-" : formatFileSize(file.size)}</td>
              </tr>
            ))}
            {sortedFiles.length === 0 && (
              <tr>
                <td colSpan={3} className="empty-message">
                  No files or folders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
