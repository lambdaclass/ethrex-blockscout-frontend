import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { TX_TYPES } from 'toolkit/utils/consts';

import type { Transaction } from 'types/api/transaction';

import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import TextSeparator from 'ui/shared/TextSeparator';

type Props = Pick<Transaction, 'nonce' | 'type' | 'position'> & { queueIndex?: number };

const TxDetailsOther = ({ nonce, type, position, queueIndex }: Props) => {
  return (
    <>
      <DetailedInfo.ItemLabel
        hint="Other data related to this transaction"
      >
        Other
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue multiRow>
        {
          [
            typeof type === 'number' && (
              <Box key="type">
                <span>Txn type: </span>
                <span>{type}</span>
                {type === TX_TYPES.EIP1559 && <Text fontWeight="400" as="span" ml={1} color="text.secondary">(EIP-1559)</Text>}
                {type === TX_TYPES.EIP4844 && <Text fontWeight="400" as="span" ml={1} color="text.secondary">(EIP-4844)</Text>}
                {type === TX_TYPES.EIP7702 && <Text fontWeight="400" as="span" ml={1} color="text.secondary">(EIP-7702)</Text>}
                {type === TX_TYPES.DEPOSIT && <Text fontWeight="400" as="span" ml={1} color="text.secondary">(L2 Deposit)</Text>}
              </Box>
            ),
            queueIndex !== undefined ? (
              <Box key="queueIndex">
                <span>Queue index: </span>
                <span>{queueIndex}</span>
              </Box>
            ) : (
              <Box key="nonce">
                <span>Nonce: </span>
                <span>{nonce}</span>
              </Box>
            ),
            position !== null && position !== undefined && (
              <Box key="position">
                <span>Position: </span>
                <span>{position}</span>
              </Box>
            ),
          ]
            .filter(Boolean)
            .map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <TextSeparator />}
                {item}
              </React.Fragment>
            ))
        }
      </DetailedInfo.ItemValue>
    </>
  );
};

export default TxDetailsOther;
