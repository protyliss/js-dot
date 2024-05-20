const $$relyedInstances = Symbol('.relied');
const $$reliableMap = Symbol('.reliableMap');
const $$reliablyPromises = Symbol('.reliablyPromiseTokens');
const $$primaryTokens   = Symbol('.primaryTokens');

const $$relying = Symbol('.relying');
/**
 * `rely-able` Scope
 *
 * @alpha
 */
class Relier {
	protected static [$$relying] = [];

	protected [$$relyedInstances]  = new Map();
	protected [$$reliableMap] = new Map();
	protected [$$reliablyPromises] = new Map<any, Set<Function>>;
	protected [$$primaryTokens]    = new Map();

	rely() {
	}

	relify() {

	}

	reliabled() {

	}

	reliably() {

	}
}