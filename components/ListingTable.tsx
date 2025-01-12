import "@/style/listing.scss";
import { IListingTable } from "@/interface";
import ListingHeaderEntry from "./ListingHeaderEntry";

export default function ListingTable({
  style,
  children,
  selectedRows = [],
  totalPages = 0,
  sortData,
  setSortData = () => {},
  headerItems,
  data = [],
}: IListingTable) {
  return (
    <div className="listing__page__table" style={style}>
      <div className="listing__page__table__header">
        <div>Action</div>
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
