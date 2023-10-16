import { SlotConstants } from '@constants/Enums';

export interface Slot {
  parent: any;
  sport_id: any;
  root_id: {
    $oid: string;
  };
  ground_name: string;
  slot_name: string;
  slot_title: string;
  slot_id: {
    $oid: string;
  };
  membership_plan_status: number;
  advance_payment: number;
  advance_payment_value: number;
  display_slot_name: string;
  minimum_bookable_time: number;
  maximum_bookable_time: number;
  visibility: number;
  fixed_hours: number;
  settlement_category: {
    $oid: string;
  };
  settlement_category_tags: string[];
  is_merged: null | any;
}

export interface Sport {
  item_id: {
    $oid: string;
  };
  item_name: string;
  item_icon: string;
  item_description: string;
  notes: null | any;
  is_slot_required: number;
  is_section: number;
}

export interface Split {
  slot: Slot;
  weight: number;
  position: number;
  sport: Sport;
  isRoot: boolean;
  parentTitle: string;
  parentName: string;
}

const groundSpliting = (slots: Slot[], sports: Sport[]): Split[] => {
  const newSplits: Split[] = [];

  slots
    .filter((sportSlot) => sportSlot.parent === 0)
    .forEach((ground, groundIndex) => {
      const sport = sports.find((sportsItem) => sportsItem.item_id.$oid === ground.sport_id.$oid);

      const ground_id = ground.slot_id.$oid;
      const weight = 1;

      if (ground.visibility !== SlotConstants.SLOT_INVISIBLE) {
        newSplits.push({
          slot: ground,
          weight,
          position: 1,
          sport,
          isRoot: true,
          parentTitle: ground.slot_title,
          parentName: ground.slot_name,
        });
      }

      const getChildren = (parent_id: string, weight: number) => {
        const children = slots.filter(
          (item) =>
            item.parent.$oid === parent_id &&
            item.sport_id.$oid === sport.item_id.$oid &&
            item.visibility !== SlotConstants.SLOT_INVISIBLE,
        );
        const length = children.length;

        if (length > 0) {
          const w = weight * (1 / (length === 1 ? 2 : length));
          children.forEach((c, i) => {
            newSplits.push({
              slot: c,
              weight: w,
              position: i + 1,
              sport,
              isRoot: false,
              parentTitle: ground.slot_title,
              parentName: ground.slot_name,
            });
            getChildren(c.slot_id.$oid, w);
          });
        }
      };

      getChildren(ground_id, weight);
    });
  return newSplits;
};

export default groundSpliting;
