import "@/style/listing.scss";

import { IListingTable } from "@/interface";
import ListingActionBar from "./ListingActionBar";
import ListingHeaderEntry from "./ListingHeaderEntry";
import ListingCheckbox from "./ListingCheckbox";

export default function ListingTable({
  style,
  children,
  actions,
  selectedRows = [],
  setSelectedRows = () => {},
  totalPages = 0,
  sortData,
  setSortData = () => {},
  headerItems,
  data = [],
  noCheckbox,
}: IListingTable) {
  return (
    <div className="listing__page__table" style={style}>
      <div className="listing__page__table__header">
        {selectedRows && !noCheckbox && (
          <ListingHeaderEntry className="checkbox">
            <ListingCheckbox
              checked={selectedRows.length === data?.length && data?.length > 0}
              partiallyChecked={
                selectedRows.length > 0 && selectedRows.length < data.length
              }
              onClick={() => {
                if (selectedRows.length === data?.length) {
                  setSelectedRows([]);
                } else {
                  setSelectedRows(data?.map((item) => item.id));
                }
              }}
            />
          </ListingHeaderEntry>
        )}
        {headerItems?.map((item) => (
          <ListingHeaderEntry
            key={item.key}
            sortKey={item.key}
            sortData={sortData}
            onSort={(value: any) => setSortData(value)}
            hasImage={item.hasImage}
            style={item.style}
          >
            {item.name}
          </ListingHeaderEntry>
        ))}
      </div>
      <div className="listing__page__table__scrollable">
        {selectedRows && (actions?.length ?? 0) > 0 && (
          <ListingActionBar selectedItems={selectedRows?.length}>
            {actions?.map((action) => (
              <button
                type="button"
                key={action.name}
                className="listing__page__table__actions__button"
              >
                {action.icon}
                {action.name}
              </button>
            ))}
          </ListingActionBar>
        )}
        <div className="listing__page__table__content">{children}</div>
      </div>
      {totalPages > 0 && (
        <div className="listing__page__table__footer">
          <div className="listing__page__table__footer__stats">
            {selectedRows.length > 0 && (
              <div className="listing__page__table__footer__stats__entry">
                {selectedRows.length} Selected
              </div>
            )}
            <div className="listing__page__table__footer__stats__entry">
              {data?.length} Entries
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
